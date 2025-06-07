'use client';
import { languageMap, Locale } from '@/i18n/config';
import { setUserLocale } from '@/i18n/locale';
import { cn } from '@/lib/utils';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { startTransition, useState } from 'react';
import { MdKeyboardArrowDown, MdLanguage } from 'react-icons/md';

const Language = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(['en'])); // 默认选中英文
  const currentLang = Array.from(selectedKeys)[0] as Locale;

  const switchLanguage = (lang: Locale) => {
    startTransition(() => {
      setUserLocale(lang);
      setSelectedKeys(new Set([lang]));
    });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="flex items-center gap-2">
          <MdLanguage className="h-5 w-5" /> {languageMap[currentLang]}
          <MdKeyboardArrowDown className={cn('h-5 w-5')} />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selector"
        selectedKeys={selectedKeys}
        selectionMode="single"
        onSelectionChange={(keys) => {
          const lang = Array.from(keys as Set<string>)[0] as Locale;
          switchLanguage(lang);
        }}>
        {Object.entries(languageMap).map(([key, label]) => (
          <DropdownItem key={key} textValue={label}>
            <div className="flex items-center gap-2">
              <div className={cn('h-2 w-2 rounded-full bg-gray-300', currentLang === key && 'bg-gray-900')} />
              {label}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Language;
