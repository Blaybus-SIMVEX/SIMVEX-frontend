import Logo from '@/shared/ui/Logo';
import TopNavigation from '@/shared/widgets/navigation/TopNavigation';

export default function Header() {
  return (
    <header className="flex w-full px-10 py-3 gap-2.5 z-50">
      <div className="flex items-center gap-7.5">
        <Logo />
        <TopNavigation />
      </div>
    </header>
  );
}
