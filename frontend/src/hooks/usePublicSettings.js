import { useQuery } from '@tanstack/react-query';
import { fetchSettings } from '@/services/settings.service';
import { queryKeys } from '@/lib/queryKeys';

export function usePublicSettings() {
  return useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: fetchSettings,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicContact() {
  const { data: settings = [] } = usePublicSettings();
  const map = Object.fromEntries(settings.map((item) => [item.key, item.value ?? '']));

  const phone = map.contact_phone;
  const whatsapp = map.contact_whatsapp || phone?.replace(/[^0-9]/g, '');
  const email = map.contact_email;
  const address = map.contact_address;

  return {
    whatsappNumber: whatsapp,
    whatsappUrl: whatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}` : null,
    phone,
    phoneHref: phone ? `tel:${phone.replace(/[^0-9+]/g, '')}` : null,
    email,
    emailHref: email ? `mailto:${email}` : null,
    address,
  };
}
