import {useCallback, useState} from "react";

export const useDisclosure = (state) => {
    const [isOpen, setIsOpen] = useState(state);

    const handleOpen = useCallback(() => setIsOpen(true), []);
    const handleClose = useCallback(() => setIsOpen(false), []);
    const handleToggle = useCallback(() => setIsOpen((state) => !state), []);
    return {
        isOpen,
        handleOpen,
        handleClose,
        handleToggle,
    };
}
