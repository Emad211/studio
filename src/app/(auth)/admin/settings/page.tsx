
import { getSiteSettings, getApiKeys } from "@/lib/actions";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const settings = await getSiteSettings();
  const apiKeys = await getApiKeys();

  return <SettingsForm settings={settings} apiKeys={apiKeys} />;
}
