'use client';
import {useRef} from 'react';
import { Box, Modal, ModalContent, ModalOverlay, ModalBody,useDisclosure, Text, Center } from '@chakra-ui/react';
import SubscriptionList from '../subscriptionList/subscriptionList';
import RegisterForm from '../auth/registerForm';
import styles from './index.module.css';
import { ISubInfoPageFields } from '@/interfaces/subInfoPageFields';







const  SubInfoComponent = ({fields}: {fields?: ISubInfoPageFields}) =>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = useRef(null);
    const {first_text, second_text} = fields?.data.attributes || {};



const regex = /\*\*(.*?)\*\*/g;
const regexRed = /<red>(.*?)<\/red>/g;

const formatedFirstText = first_text?.replace(regex,'<strong>$1</strong>').replace(regexRed, '<span style="color: red;">$1</span>');
const formatedSecondText = second_text?.replace(regex, "<strong>$1</strong>").replace(regexRed, '<span style="color: red;">$1</span>');
    return (
 
        <Box className={styles.root} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            
        <div className={styles.textHolder} >
            
            {first_text && <Text dangerouslySetInnerHTML={{__html:formatedFirstText as string | TrustedHTML}} className={styles.infoText} />} 
           {second_text && <Text dangerouslySetInnerHTML={{__html:formatedSecondText as string | TrustedHTML}} className={styles.infoText} /> }
        </div>
            <SubscriptionList onOpenRegisterModal={onOpen}/>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <RegisterForm onRegisterModalClose={onClose}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>

    );
};


export default SubInfoComponent;