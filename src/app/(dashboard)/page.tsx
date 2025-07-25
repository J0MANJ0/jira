import { getCurrent } from '@/features/auth/queries';
import { getWorkspaces } from '@/features/workspaces/queries';
import { CreateWorkspaceForm } from '@/features/workspaces/components/create-workspace-form';

import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getCurrent();
  const workspaces = await getWorkspaces();
  if (!user) redirect('/sign-in');

  if (!workspaces.total) {
    redirect('/workspaces/create');
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
  return <div>Home</div>;
}
