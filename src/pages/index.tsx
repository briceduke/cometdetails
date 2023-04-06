/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { interestInput } from '@/common/schemas/interest.schema'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { interestSchema } from '@/common/schemas/interest.schema';
import { api } from '@/utils/api';
import { handleErrors } from '@/utils/handle-errors.util';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Group, Paper, Text, TextInput, Title } from '@mantine/core';

export function ContactUs() {
  const { register, handleSubmit, reset, formState: { errors, isLoading, isSubmitting } } = useForm<interestInput>({
    resolver: zodResolver(interestSchema),
  });

  const { isLoading: interestLoading, mutate } = api.interest.interest.useMutation({
    onError: (e) => handleErrors({ e, message: "Something went wrong, try again!" }),
    onSuccess: () => {
      toast.success('You\'ve successfully signed up! Thank you :D')
      reset()
    }
  })

  const loading = isLoading || isSubmitting || interestLoading;

  const handleForm = (data: interestInput) => {
    mutate(data)
    return;
  };

  return (
    <Box className='w-screen h-screen flex items-center justify-center' sx={(theme) => ({
      // subscribe to color scheme changes
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors['bg']![0] : theme.colors['bg']![0],
    })}>
      <Container size={1000} my={30}>
        <Title align="center" color={'brand.0'}>
          Comet Car Details
        </Title>
        <Text c="dimmed" fz="md" ta="center" w={400}>
          Enter your email and/or your phone number and we&apos;ll let you know when we are available!
        </Text>

        <Paper shadow="md" p={30} radius="md" mt="xl" bg={'bg.0'}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(handleForm)}>
            <TextInput error={errors.name?.message ?? ''} {...register('name')} label="Your name (first or full, doesn't matter)" required />
            <TextInput error={errors.email?.message ?? ''} {...register('email')} type='email' label="Your email" />
            <TextInput error={errors.phone?.message ?? ''} {...register('phone')} label="Your phone" />

            <Group position="apart" mt="lg" >
              <Button type='submit' loading={loading} color='brand.0'>Notify Me!</Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default ContactUs;