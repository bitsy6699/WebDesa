import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardInput } from '@/dashboard/components/atoms/DashboardInput';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { DashboardForm } from '@/dashboard/components/forms/DashboardForm';
import { FormSection } from '@/dashboard/components/forms/FormSection';
import { FormActions } from '@/dashboard/components/forms/FormActions';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { API_ROUTES } from '@/constants/routes';

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

  useEffect(() => {
    if (user?.username) {
      profileForm.reset({ username: user.username });
    }
  }, [user?.username, profileForm]);

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

  return (
    <div className="space-y-5">
      <PageHeader title="Pengaturan" description="Kelola profil dan keamanan akun Anda." />

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
    </div>
  );
}
