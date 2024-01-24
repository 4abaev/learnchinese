'use client';
import { IFooterFields } from '@/interfaces/footerFields';
import { Box, Center, Divider, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelegram } from 'react-icons/bs';
import { HiDocumentText } from 'react-icons/hi';
import { useTranslations } from 'use-intl';

const Footer = ({fields}:{fields: IFooterFields | undefined}) => {
    
   
    const {email, telegram, support, grants, ip, inn} = fields?.data?.attributes || {};

   
    const t = useTranslations('Layout');
    return (
        <Flex
            borderTop={'1px solid #ccc'}
            bgColor={'#f8f8f8'}
            color={'#686868'}
            p={'15px'}
            lineHeight={'20px'}
            boxShadow={'2xl'}
            height={'max-content'}
            width={'100%'}
            flexDirection={['column', 'column', 'row']}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Box>
                <Heading fontSize={[20, 24, 26]}>ShowChinese</Heading>
            </Box>
            <Center display={['none', 'none', 'block']} height='80px' mx={5}>
                <Divider orientation='vertical' />
            </Center>
            <Center width={[200, 260, 310]}  display={['block', 'block', 'none']} my={1}>
                <Divider borderColor={'black'} orientation='horizontal' />
            </Center>
            <Box display={'flex'} flexDir={'column'}>
                <Flex alignItems={'center'} flexDir={['column', 'column', 'row']}>
                    <Box textAlign={'center'}>
                        <Link style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: 'max-content' }} href={'/info/oferta'}>
                            <Icon as={HiDocumentText} mr={1} />
                            <Text>{t('oferta')}</Text>
                        </Link>
                        <Link style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }}
                            href={'/info/privacy'}>
                            <Icon as={HiDocumentText} mr={1} />
                            <Text>{t('privacy')}</Text>
                        </Link>
                        <Link style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }}
                            href='mailto:showchinese2023@gmail.com'>
                            <Icon as={AiOutlineMail} mr={1} />
                            {email&&<Text>{email}</Text>}
                        </Link>
                        <Link style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }}
                            href='https://t.me/showchinese'>
                            <Icon as={BsTelegram} mr={1} />
                            {telegram && <Text>{telegram}</Text>}
                        </Link>
                        <Link style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }}
                            href='https://t.me/showchinese_bot'>
                            {support && <Text>{t('tg_err')}: {support}</Text>}
                        </Link>
                        <Link style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }}
                            href='https://t.me/showchineseapply_bot'>
                           {grants && <Text style={{width: 'auto'}}>{t('tg_china')}: {grants}</Text>}
                        </Link>
                    </Box>
                    <Center display={['none', 'none', 'block']} height='80px' mx={5}>
                        <Divider orientation='vertical' />
                    </Center>
                    <Center width={[200, 260, 310]}  display={['block', 'block', 'none']} my={1}>
                        <Divider borderColor={'black'} orientation='horizontal' />
                    </Center>
                    <Flex flexDir={'column'} justifyContent={'center'} alignItems={['center', 'center', 'flex-start']}>
                        <Text mt={'10px'}>{ip}</Text>
                        <Text mt={'10px'}>{inn}</Text>
                    </Flex>
                </Flex>
            </Box>
        </Flex> 
    );
};

export default Footer;
