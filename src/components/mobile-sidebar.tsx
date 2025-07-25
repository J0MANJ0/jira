'use client';

import React, { useEffect, useState } from 'react';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import { Sidebar } from './sidebar';
import { usePathname } from 'next/navigation';

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);
  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='secondary' className='lg:hidden'>
          <MenuIcon className='size-4 text-neutral-500' />
        </Button>
      </SheetTrigger>
      <SheetContent className='p-0' side='left'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
