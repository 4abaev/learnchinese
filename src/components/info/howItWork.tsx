'use client';

import { IGuidePageFields } from '@/interfaces/guidePageFields';
import { Box, Container, Flex, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'use-intl';

const HowItWork = ({fields}: {fields: IGuidePageFields | undefined}) => {
   const {title, description, steps} = fields?.data?.attributes || {};
   const formatted_text = description?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') as string ;
    const t = useTranslations('HowItWork');
    return (
        <Container maxWidth={1100}>
            <Box p={[0, 4]} mb={4}>
                {title && <Heading as='h1' fontSize={'22px'} mb={4}>
                    {title}
                </Heading>}
                <Text className={'dangerousText'} dangerouslySetInnerHTML={{ __html: formatted_text }} >
                </Text>
            </Box>

            <Box p={[0, 4]} bg='white' mb={4}>
                <Heading as='h2' size='lg' mb={4}>
                    {t('how-it-works')}
                </Heading>

             {steps && steps.map((step: any)=> {
                const {id, title, text, image} = step;
                const imgURL = image?.data?.attributes?.url;
                return (
                    <Box key={id} mb={4}>
                    {title && <Heading as='h3' size='md' my={4}>
                        {title}
                    </Heading>}
                    {imgURL && <Flex my={6} flexDir={'column'} alignItems={'center'}>
                        <Image src={process.env.NEXT_PUBLIC_STRAPI_UPLOADS_HTTPS + imgURL} alt='Step 1' width={500} height={300} />
                    </Flex>}
                    <UnorderedList textAlign={'left'}>
                    {text && <Text>
                        {text.split('\n').map((item : string, index: number)=> {
              return (
                <React.Fragment key={index} >
                {item}
                <br/>
                </React.Fragment>
              ); 
            })}
                    </Text>}
                    </UnorderedList>
                </Box>
                );
             })}
               
            </Box>
        </Container>
    );


};

export default HowItWork;


