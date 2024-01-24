'use client';
import { Box, Text, UnorderedList, ListItem, Divider } from '@chakra-ui/react';
import { useTranslations } from 'use-intl';

const PrivacyPolicy = () => {
    const t = useTranslations('Policy');
    return (
        <Box px={2} maxWidth={991} my={8} mx={'auto'}>
            <Text fontSize='xl' fontWeight='bold'></Text>
            <Divider borderColor={'black'} mt={10} />
            <Text fontSize='lg' fontWeight='semibold'>1. {t('section-1')}</Text>
            <Text mt='2'>
                {t('section-1-intro')}
            </Text>
            <UnorderedList mt='2' spacing={1}>
                <ListItem>1.1. {t('section-1-1')}</ListItem>
                <ListItem>1.2. {t('section-1-2')} <a
                    href='https://showchinese.ru'>https://showchinese.ru</a>.</ListItem>
            </UnorderedList>
            <Divider borderColor={'black'} mt={10} />
            <Text fontSize='lg' fontWeight='semibold'>2. {t('section-2')}</Text>
            <UnorderedList mt='2' spacing={1}>
                <ListItem>2.1. {t('section-2-1')}</ListItem>
                <ListItem>2.2. {t('section-2-2')}</ListItem>
                <ListItem>2.3. {t('section-2-3')} <a
                    href='https://showchinese.ru'>https://showchinese.ru</a>;</ListItem>
                <ListItem>2.4. {t('section-2-4')}</ListItem>
                <ListItem>2.5. {t('section-2-5')}</ListItem>
                <ListItem>2.6. {t('section-2-6')}</ListItem>
                <ListItem>2.7. {t('section-2-7')}</ListItem>
                <ListItem>2.8. {t('section-2-8')} <a
                    href='https://showchinese.ru'>https://showchinese.ru</a>;</ListItem>
                <ListItem>2.9. {t('section-2-9')} <a
                    href='https://showchinese.ru'>https://showchinese.ru</a>;</ListItem>
                <ListItem>2.10. {t('section-2-10')} </ListItem>
                <ListItem>2.11. {t('section-2-11')}</ListItem>
                <ListItem>2.12. {t('section-2-12')}</ListItem>
                <ListItem>2.13. {t('section-2-13')}</ListItem>
            </UnorderedList>
            <Divider borderColor={'black'} mt={10} />
            <Text fontSize='lg' fontWeight='semibold'>3. {t('section-3')}</Text>
            <UnorderedList mt='2' spacing={1}>
                <ListItem>3.1. {t('section-3-1')}</ListItem>
                <ListItem>3.2. {t('section-3-2')} </ListItem>
                <ListItem>3.3. {t('section-3-3')}</ListItem>
            </UnorderedList>
            <Divider borderColor={'black'} mt={10} />
            <Text fontSize='lg' fontWeight='semibold'>4. {t('section-4')}</Text>
            <Text mt='2'>4.1. {t('section-4-1')} </Text>
            <Text mt='2'>4.2. {t('section-4-2')} </Text>
            <Text mt='2'>4.3. {t('section-4-3')}</Text>
            <Divider borderColor={'black'} mt={10} />
            <Text fontSize='lg' fontWeight='semibold'>5. {t('section-5')}</Text>
            <Text mt='2'>5.1. {t('section-5-1')} </Text>
            <Text mt='2'>5.2. {t('section-5-2')} </Text>
            <Divider borderColor={'black'} mt={10} />
            <Text fontSize='lg' fontWeight='semibold'>6. {t('section-6')}</Text>
            <Text mt='2'>{t('section-6-intro')} </Text>
            <Text mt='2'>6.1. {t('section-6-1')} </Text>
            <Text mt='2'>6.2. {t('section-6-2')} </Text>
            <Text mt='2'>6.3. {t('section-6-3')}</Text>
            <Text mt='2'>6.4. {t('section-6-4')}</Text>
            <Divider borderColor={'black'} mt={10} />
            <Text fontSize='lg' fontWeight='semibold'>7. {t('section-7')}</Text>
            <Text mt='2'>7.1. {t('section-7-1')}</Text>
            <Text mt='2'>7.2. {t('section-7-2')}</Text>
            <Divider borderColor={'black'} mt={10} />
            <Text fontSize='lg' fontWeight='semibold'>8. {t('section-8')}</Text>
            <Text mt='2'>8.1. {t('section-8-1')} </Text>
            <Text mt='2'>8.2. {t('section-8-2')} </Text>
            <Text mt='2'>8.3. {t('section-8-3')}</Text>
        </Box>
    );
};

export default PrivacyPolicy;
