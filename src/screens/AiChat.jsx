// src/screens/AiChat.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Box, VStack, HStack, Input, IconButton, Text, Avatar, Flex, Spinner } from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

const AiChat = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hola Ana, soy tu asistente de marketing. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef(null);

  // Efecto para hacer scroll automático al final de los mensajes
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const getAiResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    // Lógica de IA simulada (Mockup)
    if (lowerCaseMessage.includes('modelo más vendido')) {
      return 'El modelo más vendido este mes es la Tracker, con 35 matrículas. Representa una gran oportunidad para campañas de accesorios.';
    }
    if (lowerCaseMessage.includes('modelo a impulsar')) {
      return 'El modelo con menor progreso hacia su objetivo es la Tahoe. Podríamos considerar una campaña de "bono de descuento" para inventario existente.';
    }
    if (lowerCaseMessage.includes('ideas para onix')) {
      return 'Claro, para el Onix HB, podríamos lanzar una campaña en redes sociales enfocada en su eficiencia de combustible y tecnología, dirigida a un público joven y universitario.';
    }
    return 'No estoy seguro de cómo responder a eso. Intenta preguntarme por el "modelo más vendido" o "ideas para Onix".';
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simula el tiempo de respuesta de la IA
    setTimeout(() => {
      const aiResponseText = getAiResponse(userMessage.text);
      const aiMessage = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Flex h="calc(100vh - 73px)" direction="column">
      {/* Área de Mensajes */}
      <VStack flex="1" overflowY="auto" p={6} spacing={6}>
        {messages.map((msg, index) => (
          <Flex key={index} w="100%" justify={msg.sender === 'ai' ? 'flex-start' : 'flex-end'}>
            {msg.sender === 'ai' && <Avatar icon={<FaRobot />} bg="gray.300" mr={3} />}
            <Box
              bg={msg.sender === 'ai' ? 'gray.100' : 'blue.500'}
              color={msg.sender === 'ai' ? 'black' : 'white'}
              px={4} py={2}
              borderRadius="lg"
              maxW="70%"
            >
              <Text>{msg.text}</Text>
            </Box>
            {msg.sender === 'user' && <Avatar name="Anna" ml={3} />}
          </Flex>
        ))}
        {isLoading && (
          <Flex w="100%" justify="flex-start">
            <Avatar icon={<FaRobot />} bg="gray.300" mr={3} />
            <Box bg='gray.100' px={4} py={3} borderRadius="lg">
              <Spinner size="sm" />
            </Box>
          </Flex>
        )}
        <div ref={endOfMessagesRef} />
      </VStack>

      {/* Área de Input */}
      <HStack p={4} borderTopWidth="1px">
        <Input
          placeholder="Pregúntale algo a tu asistente..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <IconButton
          icon={<FiSend />}
          colorScheme="green"
          aria-label="Enviar mensaje"
          onClick={handleSendMessage}
          isLoading={isLoading}
        />
      </HStack>
    </Flex>
  );
};

export default AiChat;