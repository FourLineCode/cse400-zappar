import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { ImageTracker, Loader, ZapparCamera, ZapparCanvas } from '@zappar/zappar-react-three-fiber';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Lesson = 'ohms-law' | null;
interface LessonContent {
  path: string;
  title: string;
  description: string;
}

const lessonContent: Record<string, LessonContent> = {
  'ohms-law': {
    path: '/simulation/ohms-law',
    title: "Ohm's Law circuit detected",
    description: "We have detected Ohm's law circuit. Do you want to start the simulation?",
  },
};

export default function Tracker() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<Lesson>(null);

  return (
    <main className='relative w-screen h-screen'>
      <Modal isCentered isOpen={visible !== null} onClose={() => setVisible(null)}>
        <ModalOverlay />
        {visible !== null && (
          <ModalContent>
            <ModalHeader>{lessonContent[visible].title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>{lessonContent[visible].description}</p>
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={() => setVisible(null)}>
                Cancel
              </Button>
              <Button colorScheme='whatsapp' onClick={() => navigate(lessonContent[visible].path)}>
                Start simulation
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
      <ZapparCanvas>
        <ZapparCamera />
        <directionalLight position={[0, 5, 10]} />
        <ImageTracker targetImage='/images/ohms.zpt' onVisible={() => setVisible('ohms-law')} />
        <ImageTracker targetImage='/images/circuit.zpt' onVisible={() => setVisible('ohms-law')} />
        <Loader />
      </ZapparCanvas>
    </main>
  );
}
