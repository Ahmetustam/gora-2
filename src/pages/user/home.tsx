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

// DİKKAT: Buradaki HomeView importunu sildik, hata buydu!

const HomePage: NextPageWithLayout = () => {
  return (
    <Box>
      <Heading size="md" mb={5}>Sunucu Seçin</Heading>
      <Text color="gray.400" mb={8}>Botun ayarlarını yönetmek için bir sunucu seçin.</Text>
      <GuildSelect />
    </Box>
  );
};

export function GuildSelect() {
  const guilds = useGuilds();

  if (guilds.status === 'success') {
    // config.guild.filter içindeki mantığa göre sunucuları süzüyoruz
    const filteredGuilds = guilds.data?.filter((guild) => config.guild.filter(guild)) || [];

    if (filteredGuilds.length === 0) {
      return (
        <Card variant="primary" p={10} textAlign="center">
          <Text mb={4}>Yönetici olduğunuz veya botun bulunduğu bir sunucu bulunamadı.</Text>
          <Button 
            as="a" 
            href={config.inviteUrl} 
            target="_blank" 
            variant="primary"
            alignSelf="center"
          >
            Botu Davet Et
          </Button>
        </Card>
      );
    }

    return (
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={3}>
        {filteredGuilds.map((guild) => (
          <Card key={guild.id} variant="primary" as={Link} href={`/guilds/${guild.id}`}>
            <CardHeader as={Flex} flexDirection="row" gap={3} alignItems="center">
              <Avatar src={iconUrl(guild)} name={guild.name} size="md" />
              <Text fontWeight="bold" noOfLines={1}>{guild.name}</Text>
            </CardHeader>
          </Card>
        ))}
      </SimpleGrid>
    );
  }

  if (guilds.status === 'error')
    return (
      <Card variant="primary" p={5} borderColor="red.500">
        <Text color="red.400" mb={3}>API bağlantısı sağlanamadı. Lütfen backend (bot) IP adresini kontrol edin.</Text>
        <Button size="sm" onClick={() => guilds.refetch()}>Tekrar Dene</Button>
      </Card>
    );

  if (guilds.status === 'loading')
    return (
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={3}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} minH="88px" rounded="2xl" />
        ))}
      </SimpleGrid>
    );

  return null;
}

HomePage.getLayout = (page) => <AppLayout>{page}</AppLayout>;
export default HomePage;
