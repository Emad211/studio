
import { getSiteSettings } from "@/lib/actions";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  // The advanced object is now deprecated and merged into a new security object
  // for the form. We can remove it from the props passed to the form.
  const { advanced, ...restOfSettings } = settings;

  return <SettingsForm settings={{...restOfSettings, advanced: advanced }} />;
}
