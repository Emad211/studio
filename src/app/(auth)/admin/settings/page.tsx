import { getSiteSettings } from "@/lib/actions";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return <SettingsForm settings={settings} />;
}
