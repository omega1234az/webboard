// composables/useLocalStorage.ts

export function useLocalStorage() {
  // ฟังก์ชัน getItem จะคืนค่าเป็น string หรือ null
  const getItem = (key: string): string | null => {
    if (typeof window !== 'undefined') { // ตรวจสอบว่าโค้ดรันในเบราว์เซอร์หรือไม่
      return localStorage.getItem(key);
    }
    return null;
  };

  // ฟังก์ชัน setItem รับ key และ value ที่เป็น string
  const setItem = (key: string, value: string): void => {
    if (typeof window !== 'undefined') { // ตรวจสอบว่าโค้ดรันในเบราว์เซอร์หรือไม่
      localStorage.setItem(key, value);
    }
  };

  // ฟังก์ชัน removeItem รับ key ที่เป็น string
  const removeItem = (key: string): void => {
    if (typeof window !== 'undefined') { // ตรวจสอบว่าโค้ดรันในเบราว์เซอร์หรือไม่
      localStorage.removeItem(key);
    }
  };

  return {
    getItem,
    setItem,
    removeItem
  };
}
