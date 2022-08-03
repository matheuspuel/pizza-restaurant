import * as SplashScreen from 'expo-splash-screen'
import { Button, Flex, Heading, Image, Link, Text } from 'native-base'
import headerLogo from 'src/assets/images/header-logo.png'
import { restaurantName } from 'src/data'
import { t } from 'src/i18n'
import { RootStackScreenProps } from 'src/routes/RootStack'
import {
  appVersionName,
  privacyPolicyUrl,
  termsOfServiceUrl,
} from 'src/utils/constants'

export const Home = (props: RootStackScreenProps<'Home'>) => {
  const { navigation } = props

  return (
    <Flex flex={1} safeArea bg="background" onLayout={SplashScreen.hideAsync}>
      <Flex flex={1} />
      <Flex h="100px" w="full" p="2">
        <Image
          h="full"
          w="full"
          resizeMode="contain"
          alt={restaurantName}
          source={headerLogo}
        />
      </Flex>
      <Text alignSelf="center" p="2" fontSize="2xl" color="red.900" bold>
        {restaurantName}
      </Text>
      <Flex flex={1} />
      <Heading p={2} textAlign="center">
        {t('welcome')}
      </Heading>
      <Flex flex={1} />
      <Button m="4" p="4" onPress={() => navigation.navigate('Sizes')}>
        {t('start_order')}
      </Button>
      <Flex flex={1} />
      <Flex direction="row" justify="space-evenly">
        <Link href={privacyPolicyUrl}>{t('privacy_policy')}</Link>
        <Link href={termsOfServiceUrl}>{t('terms_of_service')}</Link>
      </Flex>
      <Flex flex={0.5} />
      <Flex align="center" px="2" py="1">
        <Text fontSize="2xs">{appVersionName}</Text>
        <Text fontSize="2xs">github.com/matheuspuel</Text>
        <Text fontSize="2xs">matheuspuel@gmail.com</Text>
      </Flex>
    </Flex>
  )
}
