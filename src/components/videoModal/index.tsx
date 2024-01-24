'use client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import styles from './index.module.css';
import { ReactNode } from 'react';




export default function VideoModal({children, videoUrl}:{children: ReactNode, videoUrl?: string}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
        

<div onClick={onOpen}>{children}</div>



      <Modal size={'6xl'} isCentered  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>
            Guide
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className={styles.modalBody} >
          <iframe className={styles.iframe}  src={videoUrl} title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen></iframe>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={onClose}>
              Ок
            </Button>
       
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
