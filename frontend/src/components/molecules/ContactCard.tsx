import { MapPin, Phone, Mail } from 'lucide-react';
import { Card } from '@/components/atoms/Card';

/**
 * ContactCard - Displays village contact information (typically in Footer).
 */
export function ContactCard() {
  return (
    <Card className="p-6 bg-[--bg-surface] shadow-sm">
      <h3 className="text-lg font-bold text-[--neutral-900] mb-4">Hubungi Kami</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[--color-primary] shrink-0 mt-0.5" />
          <p className="text-sm text-[--neutral-600]">
            Jl. Raya Karamatwangi No. 123<br />
            Kecamatan Garawangi<br />
            Kabupaten Kuningan, Jawa Barat 45571
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-[--color-primary] shrink-0" />
          <p className="text-sm text-[--neutral-600]">(0232) 123456</p>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-[--color-primary] shrink-0" />
          <p className="text-sm text-[--neutral-600]">info@karamatwangi.desa.id</p>
        </div>
      </div>
    </Card>
  );
}
