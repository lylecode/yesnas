import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface CommandResult {
  stdout: string;
  stderr: string;
  success: boolean;
}

export const runCommand = async (
  command: string,
  options: {
    timeout?: number;
    cwd?: string;
    maxBuffer?: number;
    outputJson?: boolean;
  } = { outputJson: true },
): Promise<CommandResult> => {
  const safeCommand = command.trim();
  const jcParser = getJcParser(safeCommand);

  const finalCommand =
    options.outputJson && jcParser
      ? `${safeCommand} | jc --${jcParser} -p`
      : options.outputJson
        ? `jc -p ${safeCommand}`
        : safeCommand;
  try {
    console.log('Run command++++:', finalCommand);
    const { stdout, stderr } = await execAsync(finalCommand, {
      timeout: options?.timeout || 5000,
      cwd: options?.cwd,
    });
    return {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      success: true,
    };
  } catch (error: any) {
    return {
      stdout: '',
      stderr: error.message || 'Command execution failed',
      success: false,
    };
  }
};

const getJcParser = (command: string): 'mdadm' | 'mdstat' | null => {
  const trimmedCommand = command.trim();
  if (trimmedCommand.match(/^(sudo\s+)?cat\s+\/proc\/mdstat$/) || trimmedCommand.startsWith('mdadm')) {
    return 'mdadm';
  }

  return null;
};
