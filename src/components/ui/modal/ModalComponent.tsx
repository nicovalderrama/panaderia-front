'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const  ModalComponent = ({ isOpen, onClose, children }: ProductModalProps) =>{
  const [quantity, setQuantity] = useState(1)


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
          {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}