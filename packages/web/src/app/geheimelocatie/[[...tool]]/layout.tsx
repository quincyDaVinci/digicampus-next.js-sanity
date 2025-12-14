import HideHeader from './HideHeader'

export { metadata, viewport } from 'next-sanity/studio'

export default function GeheimelocatieLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HideHeader />
      {children}
    </>
  );
}
