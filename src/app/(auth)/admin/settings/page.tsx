
import { getSiteSettings, getCredentials } from "@/lib/actions";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const settings = await getSiteSettings();
  const credentials = await getCredentials();
  
  return <SettingsForm settings={settings} credentials={credentials} />;
}
