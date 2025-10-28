import { HomeLayoutWrapper } from '@/app/home-layout-wrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayoutWrapper>{children}</HomeLayoutWrapper>;
}
