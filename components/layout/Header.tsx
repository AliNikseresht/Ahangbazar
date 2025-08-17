import React from "react";
import { Logo } from "./header/Logo";
import { NavLinks } from "./header/NavLinks";
import { SearchBar } from "./header/SearchBar";
import { ActionButtons } from "./header/ActionButtons";

export interface HeaderProps {
  onSearch?: (query: string) => void;
  onUpload?: () => void;
}

export function Header({ onSearch, onUpload }: HeaderProps) {

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-2 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation */}
          <NavLinks />

          {/* Search */}
          <SearchBar onSearch={onSearch} />

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ActionButtons onUpload={onUpload} />
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
            </Button> */}
            {/* <UserMenu /> */}
            {/* Mobile Menu */}
            {/* <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-300 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
