import {
  Heading,
  Button,
  Card,
  CardHeader,
  Avatar,
  Flex,
  SimpleGrid,
  Skeleton,
  Text,
  Box,
} from '@chakra-ui/react';
import { config } from '@/config/common';
import { useGuilds } from '@/api/hooks';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layout/app';
import { iconUrl } from '@/api/discord';
import Link from 'next/link';

const HomePage: NextPageWithLayout = () => {
  // SAHTE GÖRÜNÜMÜ (HomeView) KALDIRDIK, ARTIK GERÇEK SİSTEM ÇALIŞACAK
  return (
    <Box>
      <Heading size="md" mb={5}>Sunucu Seçin</Heading>
      <Text color="gray.400" mb={8}>Yapılandırmak istediğiniz sunucuyu aşağıdan seçin.</Text>
      <GuildSelect />
    </Box>
  );
};

export function GuildSelect() {
  const guilds = useGuilds();

  if (guilds.status === 'success') {
    // Botun olduğu sunucuları filtrele
    const filteredGuilds = guilds.data?.filter((guild) => config.guild.filter(guild)) || [];

    if (filteredGuilds.length === 0) {
      return (
        <Card variant="primary" p={5}>
          <Text textAlign="center">Henüz bir sunucuda bulunmuyorum veya yetkiniz yok.</Text>
          <Button as="a" href={config.inviteUrl} target="_blank" mt={3} colorScheme="purple">
            Beni Sunucuna Davet Et
          </Button>
        </Card>
      );
    }

    return (
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={3}>
        {filteredGuilds.map((guild) => (
          <Card key={guild.id} variant="primary" as={Link} href={`/guilds/${guild.id}`} _hover={{ transform: 'scale(1.02)', transition: '0.2s' }}>
            <CardHeader as={Flex} flexDirection="row" gap={3} alignItems="center">
              <Avatar src={iconUrl(guild)} name={guild.name} size="md" />
              <Text fontWeight="bold">{guild.name}</Text>
            </CardHeader>
          </Card>
        ))}
      </SimpleGrid>
    );
  }

  if (guilds.status === 'error')
    return (
      <Flex direction="column" align="center" gap={3}>
        <Text color="red.400">Bot API'sine bağlanılamadı!</Text>
        <Button w="fit-content" variant="danger" onClick={() => guilds.refetch()}>
          Tekrar Dene
        </Button>
      </Flex>
    );

  if (guilds.status === 'loading')
    return (
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={3}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} minH="88px" rounded="2xl" />
        ))}
      </SimpleGrid>
    );

  return <></>;
}

HomePage.getLayout = (c) => <AppLayout>{c}</AppLayout>;
export default HomePage;
