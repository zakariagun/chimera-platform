const API_BASE = 'https://api.chimera-platform.com'; // أو mock

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      // Mock implementation
      return {
        user: { id: '1', name: 'مستخدم تجريبي', email },
        token: 'mock-token',
      };
    },
    register: async (userData: any) => {
      // Mock implementation
      return { user: userData, token: 'mock-token' };
    },
  },
  prompts: {
    getAll: async () => {
      // Mock data
      return [
        {
          id: 1,
          title: 'تلقين فيديو متقدم',
          type: 'video',
          description: 'وصف التلقين...',
        },
        {
          id: 2,
          title: 'تلقين صورة إبداعي',
          type: 'image',
          description: 'وصف التلقين...',
        },
        {
          id: 3,
          title: 'تلقين صوتي',
          type: 'audio',
          description: 'وصف التلقين...',
        },
      ];
    },
    create: async (promptData: any) => {
      // Mock implementation
      return { id: Date.now(), ...promptData };
    },
    update: async (id: string, promptData: any) => {
      // Mock implementation
      return { id, ...promptData };
    },
    delete: async (id: string) => {
      // Mock implementation
      return { success: true };
    },
  },
};
