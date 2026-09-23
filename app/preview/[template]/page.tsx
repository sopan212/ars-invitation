import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTemplate, TEMPLATES } from '@/lib/templates';
import { InvitationView, InvitationData } from '@/components/InvitationView';

// Data contoh supaya user lihat hasil jadi sebelum isi form sendiri
const sampleData: InvitationData = {
  groom_name: 'Romeo Montague',
  groom_parents: 'Putra dari Bapak Montague & Ibu Montague',
  bride_name: 'Juliet Capulet',
  bride_parents: 'Putri dari Bapak Capulet & Ibu Capulet',
  event_date: '2026-12-31T00:00:00.000Z',
  akad_time: '08:00 - 10:00 WIB',
  resepsi_time: '11:00 - 14:00 WIB',
  location: 'Grand Ballroom Hotel Mulia',
  address_detail: 'Jl. Asia Afrika No.6, Gelora, Tanah Abang, Jakarta Pusat',
  maps_url: 'https://maps.google.com',
  quote: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya (QS. Ar-Rum: 21)',
  bank_name: 'BCA',
  bank_account: '1234567890',
  bank_holder: 'Romeo Montague',
  music_track: 'wedding-piano.mp3',
};

export function generateStaticParams() {
  return Object.keys(TEMPLATES).map((id) => ({ template: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ template: string }> }): Promise<Metadata> {
  const { template } = await params;
  const tpl = getTemplate(template);
  if (!tpl) return { title: 'Preview Template — ARS.invitation' };
  return {
    title: `Preview ${tpl.name} — ARS.invitation`,
    description: `Lihat hasil jadi template ${tpl.name} dengan data contoh.`,
  };
}

export default async function PreviewPage({ params }: { params: Promise<{ template: string }> }) {
  const { template } = await params;
  const tpl = getTemplate(template);
  if (!tpl) return notFound();

  return <InvitationView event={sampleData} template={tpl} eventId="preview-sample" />;
}
