import { MaterialIcons } from '@expo/vector-icons'
import * as SplashScreen from 'expo-splash-screen'
import I18n from 'i18n-js'
import {
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  Menu,
  MoonIcon,
  Pressable,
  SunIcon,
  Text,
  useColorMode,
} from 'native-base'
import enFlag from 'src/assets/images/flags/en.png'
import ptFlag from 'src/assets/images/flags/pt-BR.png'
import headerLogo from 'src/assets/images/header-logo.png'
import { restaurantName } from 'src/data'
import { changeLocale, t } from 'src/i18n'
import { RootStackScreenProps } from 'src/routes/RootStack'
import {
  appVersionName,
  privacyPolicyUrl,
  termsOfServiceUrl,
} from 'src/utils/constants'

export const Home = (props: RootStackScreenProps<'Home'>) => {
  const { navigation } = props
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex flex={1} safeArea onLayout={SplashScreen.hideAsync}>
      <Flex direction="row" justify="flex-end">
        <Menu
          trigger={triggerProps => (
            <Pressable
              {...triggerProps}
              rounded="sm"
              _pressed={{
                _light: { bg: 'gray.300' },
                _dark: { bg: 'gray.700' },
              }}
            >
              <Image
                m="2"
                size="8"
                rounded="full"
                alt="en"
                source={I18n.locale.startsWith('pt') ? ptFlag : enFlag}
              />
            </Pressable>
          )}
        >
          <Menu.Group title={t('Language')}>
            <Divider w="100%" />
            <Menu.Item
              flexDirection="row"
              alignItems="center"
              onPress={() => changeLocale(null)}
            >
              <Icon size="8" as={<MaterialIcons name="settings" />} />
              <Text pl="2">{t('Device_Language')}</Text>
            </Menu.Item>
            <Divider w="100%" />
            <Menu.Item
              flexDirection="row"
              alignItems="center"
              onPress={() => changeLocale('en')}
            >
              <Image size="8" rounded="full" alt="en" source={enFlag} />
              <Text pl="2">English</Text>
            </Menu.Item>
            <Menu.Item
              flexDirection="row"
              alignItems="center"
              onPress={() => changeLocale('pt-BR')}
            >
              <Image size="8" rounded="full" alt="pt" source={ptFlag} />
              <Text pl="2">Português</Text>
            </Menu.Item>
          </Menu.Group>
        </Menu>
        <IconButton
          icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          colorScheme={colorMode === 'dark' ? 'yellow' : 'darkBlue'}
          size="lg"
          onPress={toggleColorMode}
        />
      </Flex>
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
      <Text alignSelf="center" p="2" fontSize="2xl" color="primary.600" bold>
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
