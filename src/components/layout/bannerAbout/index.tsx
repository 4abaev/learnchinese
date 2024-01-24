'use client';
import React, { FC, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'use-intl';
import { Box, Flex, Heading, Text, Button  } from '@chakra-ui/react';
import styles from './index.module.css';
import { IBannerAboutFields } from '@/interfaces/bannerAboutFields';
import VideoModal from '@/components/videoModal';


interface Props {
    fields?: IBannerAboutFields
    token?: string
};

const BannerAbout: FC<Props> = ({fields, token}) => {
    const router = useRouter();
   const {title, subtitles, summary, description_subscribe, button_to_read_more} = fields?.data?.attributes || {};

    const handleOnClick = useCallback(
        () => {
            router.push('/sub-info');
        },
        [router]
    );

    const t = useTranslations('BannerAbout');

   if(!token){
    return (
        <Box marginTop='5'>
            <Flex
                flexDirection='column'
                gap='2'
                alignItems='center'>
                {title && <Heading as='h3' size='lg' className={styles.bannerHeading}>
                    {title}
                </Heading>}
                <Heading as='h4' size='md' className={styles.bannerHeading}>
                    { subtitles && subtitles.map((item: any)=> {
                         return(<React.Fragment key={item.id} >{item.text} <br/></React.Fragment>);
                    })}
                   <br/>
                    {summary}
                </Heading>
                <Flex gap='2' flexWrap='wrap' justifyContent='center' alignItems='center'>
                    {description_subscribe && <Text size='sm' className={styles.bannerText}>
                        {description_subscribe}
                    </Text>}
                    {description_subscribe && <Button colorScheme='teal' size='sm' onClick={handleOnClick} className={styles.readMoreButton}>
                        {button_to_read_more}
                    </Button>}
                   
                 
                </Flex>
            </Flex>
        </Box>
    );
   }
    
};

export default BannerAbout;
