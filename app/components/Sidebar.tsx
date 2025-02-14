'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  HomeIcon,
  UserIcon,
  BeakerIcon,
  DocumentTextIcon,
  CommandLineIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  
  return (
    <div className={`
      fixed top-0 left-0 h-screen
      ${isOpen ? 'w-64' : 'w-0 md:w-16'}
      transition-all duration-300 ease-in-out
      border-r border-gray-200 dark:border-gray-800 
      bg-white dark:bg-[#0B1120] 
      flex flex-col
      z-40
    `}>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        {isOpen ? (
          <ChevronDoubleLeftIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronDoubleRightIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Logo */}
      <div className="p-6">
        <Image 
          src="/honkai.png" 
          alt="Tavily" 
          width={100} 
          height={32}
          className={`dark:hidden ${!isOpen && 'md:hidden'}`}
        />
        <Image 
          src="/honkai.png" 
          alt="Tavily" 
          width={100} 
          height={32}
          className={`hidden dark:block ${!isOpen && 'md:hidden'}`}
        />
      </div>

      {/* Account Selector - Hide when collapsed */}
      {isOpen && (
        <div className="px-3 mb-6">
          <button className="w-full px-3 py-2 flex items-center justify-between text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <span>Personal</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1">
        {[
          { href: '/overview', icon: HomeIcon, label: 'Overview' },
          { href: '/account', icon: UserIcon, label: 'My Account' },
          { href: '/assistant', icon: BeakerIcon, label: 'Research Assistant' },
          { href: '/reports', icon: DocumentTextIcon, label: 'Research Reports' },
          { href: '/playground', icon: CommandLineIcon, label: 'API Playground' },
          { href: '/docs', icon: BookOpenIcon, label: 'Documentation', external: true }
        ].map(({ href, icon: Icon, label, external }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              pathname === href
                ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title={!isOpen ? label : undefined}
          >
            <Icon className="w-5 h-5" />
            {isOpen && (
              <>
                <span>{label}</span>
                {external && <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-auto" />}
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* User Profile - Show minimal version when collapsed */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0">
            T
          </div>
          {isOpen && (
            <div className="flex-1">
              <div className="text-sm font-medium dark:text-white">Truong Nguyen Quang</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Personal Account</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 