
import { getSiteSettings } from "@/lib/actions";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  // The logic for handling the deprecated 'advanced' object is now fully contained
  // within the SettingsForm, so we can pass the settings object directly.
  return <SettingsForm settings={settings} />;
}
