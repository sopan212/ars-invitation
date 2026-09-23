import PocketBase from 'pocketbase';
import { getTemplate } from '@/lib/templates';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { InvitationView, InvitationData } from '@/components/InvitationView';

const pb = new PocketBase('http://100.74.92.59:8090');
pb.autoCancellation(false);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    const event = await pb.collection('events').getOne(id);
    return {
      title: `${event.title} - Undangan Digital`,
      description: `Undangan pernikahan ${event.groom_name} & ${event.bride_name}`,
    };
  } catch {
    return { title: 'Undangan Digital' };
  }
}

export default async function UndanganPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const event = await pb.collection('events').getOne(id);
    const template = getTemplate(event.template_id || 'classic-elegant');

    if (!template) return notFound();

    const pbUrl = 'http://100.74.92.59:8090';
    const photoBg = event.photo_bg
      ? `${pbUrl}/api/files/${event.collectionId}/${event.id}/${event.photo_bg}`
      : undefined;
    const gallery: string[] = Array.isArray(event.gallery)
      ? event.gallery.map((f: string) => `${pbUrl}/api/files/${event.collectionId}/${event.id}/${f}`)
      : [];

    const musicUrl = event.music_url
      ? `${pbUrl}/api/files/${event.collectionId}/${event.id}/${event.music_url}`
      : undefined;

    return (
      <InvitationView
        event={{ ...(event as Record<string, unknown>), photo_bg: photoBg, gallery, music_url: musicUrl } as InvitationData}
        template={template}
        eventId={event.id}
      />
    );
  } catch {
    return notFound();
  }
}
