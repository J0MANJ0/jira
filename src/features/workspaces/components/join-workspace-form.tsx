'use client';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useJoinWorkspace } from '../api/use-join-workspace';
import Link from 'next/link';
import { useInviteCode } from '../hooks/use-invite-code';
import { useWorkspaceId } from '../hooks/use-workspace-id';
import { useRouter } from 'next/navigation';

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}
export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const inviteCode = useInviteCode();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
    >
      <Card className='size-full border-none shadow-none'>
        <CardHeader className='p-7'>
          <CardTitle className='text-xl font-bold'>Join Workspace</CardTitle>
          <CardDescription>
            You've been invited to join <strong>{initialValues.name}</strong>
          </CardDescription>
        </CardHeader>
        <div className='px-7'>
          <DottedSeparator />
        </div>
        <CardContent className='p-7'>
          <div className='flex flex-col gap-2 lg:flex-row items-center justify-between'>
            <Button
              variant='secondary'
              className='w-full lg:w-fit'
              size='lg'
              disabled={isPending}
            >
              <Link href='/'>Cancel</Link>
            </Button>
            <Button
              className='w-full lg:w-fit'
              size='lg'
              onClick={onSubmit}
              type='button'
              disabled={isPending}
            >
              Join
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
