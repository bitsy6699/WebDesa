import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardInput, DashboardTextarea } from '@/dashboard/components/atoms/DashboardInput';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { DashboardForm } from '@/dashboard/components/forms/DashboardForm';
import { FormSection } from '@/dashboard/components/forms/FormSection';
import { FormActions } from '@/dashboard/components/forms/FormActions';
import { Alert } from '@/dashboard/components/organisms/Alert';
import FadeContent from '@/components/FadeContent';
import { useAuth } from '@/hooks/useAuth';
import { useSettings, useUpdateSettings } from '@/hooks/useSettings';
import api from '@/services/api';
import { API_ROUTES } from '@/constants/routes';

const SETTINGS_FIELDS = [
  { key: 'site_name', group: 'general', type: 'text', label: 'Nama Situs', placeholder: 'contoh: Desa Karamatwangi' },
  { key: 'site_tagline', group: 'general', type: 'text', label: 'Tagline', placeholder: 'contoh: Maju, Mandiri, Sejahtera' },
  { key: 'site_description', group: 'general', type: 'textarea', label: 'Deskripsi', placeholder: 'Deskripsi singkat desa' },
  { key: 'contact_email', group: 'contact', type: 'email', label: 'Email', placeholder: 'contoh: info@karamatwangi.desa.id' },
  { key: 'contact_phone', group: 'contact', type: 'text', label: 'Telepon', placeholder: 'contoh: 022123456' },
  { key: 'contact_address', group: 'contact', type: 'textarea', label: 'Alamat', placeholder: 'Alamat kantor desa' },
  { key: 'facebook_url', group: 'social', type: 'url', label: 'Facebook', placeholder: 'https://facebook.com/...' },
  { key: 'instagram_url', group: 'social', type: 'url', label: 'Instagram', placeholder: 'https://instagram.com/...' },
  { key: 'tiktok_url', group: 'social', type: 'url', label: 'TikTok', placeholder: 'https://tiktok.com/@...' },
  { key: 'youtube_url', group: 'social', type: 'url', label: 'YouTube', placeholder: 'https://youtube.com/...' },
];

const GROUP_TITLES = {
  general: { title: 'Umum', description: 'Identitas dasar situs desa.' },
  contact: { title: 'Kontak', description: 'Informasi kontak yang ditampilkan ke publik.' },
  social: { title: 'Media Sosial', description: 'Tautan akun media sosial desa.' },
};

const DEFAULT_VALUES = Object.fromEntries(SETTINGS_FIELDS.map((f) => [f.key, '']));

export default function SettingsPage() {
  const { user } = useAuth();

  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileSubmitting, setProfileSubmitting] = useState(false);

  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);

  const profileForm = useForm({
    defaultValues: { username: user?.username ?? '' },
  });

  const passwordForm = useForm({
    defaultValues: { current_password: '', password: '', password_confirmation: '' },
  });

  const settingsForm = useForm({ defaultValues: DEFAULT_VALUES });
  const { data: settingsData, isLoading: settingsLoading } = useSettings();
  const updateSettingsMutation = useUpdateSettings();

  useEffect(() => {
    if (user?.username) {
      profileForm.reset({ username: user.username });
    }
  }, [user?.username, profileForm]);

  useEffect(() => {
    if (!settingsData) return;
    const map = Object.fromEntries(settingsData.map((item) => [item.key, item.value ?? '']));
    settingsForm.reset(
      Object.fromEntries(SETTINGS_FIELDS.map((f) => [f.key, map[f.key] ?? ''])),
    );
  }, [settingsData, settingsForm]);

  const handleProfileSubmit = async (data) => {
    setProfileSuccess('');
    setProfileError('');
    setProfileSubmitting(true);

    try {
      await api.put(API_ROUTES.AUTH_PROFILE, data);
      setProfileSuccess('Profil berhasil diperbarui.');
    } catch (err) {
      const axiosErr = err;
      setProfileError(axiosErr.response?.data?.error?.message ?? 'Gagal memperbarui profil.');
    } finally {
      setProfileSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (data) => {
    setPasswordSuccess('');
    setPasswordError('');
    setPasswordSubmitting(true);

    try {
      await api.put(API_ROUTES.AUTH_PASSWORD, data);
      setPasswordSuccess('Password berhasil diubah.');
      passwordForm.reset();
    } catch (err) {
      const axiosErr = err;
      setPasswordError(axiosErr.response?.data?.error?.message ?? 'Gagal mengubah password.');
    } finally {
      setPasswordSubmitting(false);
    }
  };

  const handleSettingsSubmit = (values) => {
    updateSettingsMutation.mutate(
      SETTINGS_FIELDS.map((f) => ({
        key: f.key,
        value: values[f.key] ?? '',
        type: 'string',
        group: f.group,
      })),
    );
  };

  const settingsError = updateSettingsMutation.error?.response?.data?.error?.message
    ?? updateSettingsMutation.error?.message;

  return (
    <div className="space-y-5">
      <PageHeader title="Pengaturan" description="Kelola profil, keamanan, dan pengaturan situs." />

      <FadeContent duration={600} delay={0} threshold={0.1}>
      <DashboardForm onSubmit={settingsForm.handleSubmit(handleSettingsSubmit)}>
        {settingsLoading ? (
          <Alert title="Memuat pengaturan situs..." variant="info" />
        ) : null}
        {updateSettingsMutation.isSuccess ? (
          <Alert title="Pengaturan situs berhasil disimpan." variant="success" />
        ) : null}
        {settingsError ? (
          <Alert title={settingsError} variant="danger" />
        ) : null}

        {Object.entries(GROUP_TITLES).map(([group, { title, description }]) => (
          <FormSection key={group} title={title} description={description}>
            {SETTINGS_FIELDS.filter((f) => f.group === group).map((field) =>
              field.type === 'textarea' ? (
                <DashboardTextarea
                  key={field.key}
                  label={field.label}
                  placeholder={field.placeholder}
                  {...settingsForm.register(field.key)}
                />
              ) : (
                <DashboardInput
                  key={field.key}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  {...settingsForm.register(field.key)}
                />
              ),
            )}
          </FormSection>
        ))}

        <FormActions>
          <DashboardButton type="submit" loading={updateSettingsMutation.isPending}>
            Simpan Pengaturan
          </DashboardButton>
        </FormActions>
      </DashboardForm>
      </FadeContent>

      <FadeContent duration={600} delay={150} threshold={0.1}>
      <DashboardForm onSubmit={profileForm.handleSubmit(handleProfileSubmit)}>
        {profileSuccess && <Alert title={profileSuccess} variant="success" />}
        {profileError && <Alert title={profileError} variant="danger" />}

        <FormSection title="Profil" description="Perbarui informasi profil admin Anda.">
          <DashboardInput
            label="Username"
            required
            placeholder="Masukkan username"
            error={profileForm.formState.errors.username?.message}
            {...profileForm.register('username', { required: 'Username wajib diisi.' })}
          />
        </FormSection>

        <FormActions>
          <DashboardButton type="submit" loading={profileSubmitting}>
            Simpan Profil
          </DashboardButton>
        </FormActions>
      </DashboardForm>
      </FadeContent>

      <FadeContent duration={600} delay={300} threshold={0.1}>
      <DashboardForm onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
        {passwordSuccess && <Alert title={passwordSuccess} variant="success" />}
        {passwordError && <Alert title={passwordError} variant="danger" />}

        <FormSection title="Ubah Password" description="Pastikan password baru minimal 8 karakter.">
          <DashboardInput
            label="Password Saat Ini"
            required
            type="password"
            placeholder="Masukkan password saat ini"
            error={passwordForm.formState.errors.current_password?.message}
            {...passwordForm.register('current_password', { required: 'Password saat ini wajib diisi.' })}
          />
          <DashboardInput
            label="Password Baru"
            required
            type="password"
            placeholder="Masukkan password baru"
            error={passwordForm.formState.errors.password?.message}
            {...passwordForm.register('password', {
              required: 'Password baru wajib diisi.',
              minLength: { value: 8, message: 'Minimal 8 karakter.' },
            })}
          />
          <DashboardInput
            label="Konfirmasi Password Baru"
            required
            type="password"
            placeholder="Ulangi password baru"
            error={passwordForm.formState.errors.password_confirmation?.message}
            {...passwordForm.register('password_confirmation', {
              required: 'Konfirmasi password wajib diisi.',
              validate: (val) => val === passwordForm.watch('password') || 'Password tidak cocok.',
            })}
          />
        </FormSection>

        <FormActions>
          <DashboardButton type="submit" loading={passwordSubmitting}>
            Ubah Password
          </DashboardButton>
        </FormActions>
      </DashboardForm>
      </FadeContent>
    </div>
  );
}
