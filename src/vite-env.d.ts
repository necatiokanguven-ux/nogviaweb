/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  readonly VITE_CHECKOUT_HOST_KIT?: string;
  readonly VITE_CHECKOUT_GUEST_GUIDE?: string;
  readonly VITE_CHECKOUT_FINANCE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
