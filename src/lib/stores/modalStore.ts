import { writable } from 'svelte/store';

interface ModalState {
	isOpen: boolean;
	type: 'token-detail' | 'intention-detail' | 'confirm' | 'error' | null;
	data: any;
}

// Modal management
export const modalState = writable<ModalState>({
	isOpen: false,
	type: null,
	data: null
});

export function openModal(type: ModalState['type'], data: any = null) {
	modalState.set({ isOpen: true, type, data });
}

export function closeModal() {
	modalState.set({ isOpen: false, type: null, data: null });
}

// Toast notifications
interface Toast {
	id: string;
	type: 'success' | 'error' | 'info';
	message: string;
}

export const toasts = writable<Toast[]>([]);

export function showToast(type: Toast['type'], message: string) {
	const id = Date.now().toString();
	toasts.update((current) => [...current, { id, type, message }]);

	// Auto-remove after 3 seconds
	setTimeout(() => {
		toasts.update((current) => current.filter((t) => t.id !== id));
	}, 3000);
}
