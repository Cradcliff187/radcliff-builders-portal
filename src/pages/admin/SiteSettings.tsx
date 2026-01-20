import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAllSiteSettings, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { Phone, BarChart3, Share2, Loader2 } from "lucide-react";

export default function SiteSettings() {
  const { toast } = useToast();
  const { data: settings, isLoading } = useAllSiteSettings();
  const updateSetting = useUpdateSiteSetting();
  
  // Local state for form values
  const [contactValues, setContactValues] = useState({
    phone_number: "",
    email_primary: "",
    service_area: "",
  });
  
  const [statsValues, setStatsValues] = useState({
    stat_years_experience: "",
    stat_projects_completed: "",
    stat_client_satisfaction: "",
    stat_coverage: "",
  });
  
  const [socialValues, setSocialValues] = useState({
    social_linkedin: "",
    social_facebook: "",
  });
  
  const [savingContact, setSavingContact] = useState(false);
  const [savingStats, setSavingStats] = useState(false);
  const [savingSocial, setSavingSocial] = useState(false);

  // Initialize form values from database
  useEffect(() => {
    if (settings) {
      const getValue = (key: string) => settings.find(s => s.setting_key === key)?.setting_value || "";
      
      setContactValues({
        phone_number: getValue("phone_number"),
        email_primary: getValue("email_primary"),
        service_area: getValue("service_area"),
      });
      
      setStatsValues({
        stat_years_experience: getValue("stat_years_experience"),
        stat_projects_completed: getValue("stat_projects_completed"),
        stat_client_satisfaction: getValue("stat_client_satisfaction"),
        stat_coverage: getValue("stat_coverage"),
      });
      
      setSocialValues({
        social_linkedin: getValue("social_linkedin"),
        social_facebook: getValue("social_facebook"),
      });
    }
  }, [settings]);

  const getLastUpdated = (group: string) => {
    if (!settings) return null;
    const groupSettings = settings.filter(s => s.setting_group === group);
    if (groupSettings.length === 0) return null;
    const latest = groupSettings.reduce((a, b) => 
      new Date(a.updated_at) > new Date(b.updated_at) ? a : b
    );
    return new Date(latest.updated_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const saveContactSettings = async () => {
    setSavingContact(true);
    try {
      await Promise.all([
        updateSetting.mutateAsync({ key: "phone_number", value: contactValues.phone_number }),
        updateSetting.mutateAsync({ key: "email_primary", value: contactValues.email_primary }),
        updateSetting.mutateAsync({ key: "service_area", value: contactValues.service_area }),
      ]);
      toast({ title: "Contact information updated", description: "Changes are now live on the website." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save. Please try again.", variant: "destructive" });
    }
    setSavingContact(false);
  };

  const saveStatsSettings = async () => {
    setSavingStats(true);
    try {
      await Promise.all([
        updateSetting.mutateAsync({ key: "stat_years_experience", value: statsValues.stat_years_experience }),
        updateSetting.mutateAsync({ key: "stat_projects_completed", value: statsValues.stat_projects_completed }),
        updateSetting.mutateAsync({ key: "stat_client_satisfaction", value: statsValues.stat_client_satisfaction }),
        updateSetting.mutateAsync({ key: "stat_coverage", value: statsValues.stat_coverage }),
      ]);
      toast({ title: "Statistics updated", description: "Changes are now live on the website." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save. Please try again.", variant: "destructive" });
    }
    setSavingStats(false);
  };

  const saveSocialSettings = async () => {
    setSavingSocial(true);
    try {
      await Promise.all([
        updateSetting.mutateAsync({ key: "social_linkedin", value: socialValues.social_linkedin }),
        updateSetting.mutateAsync({ key: "social_facebook", value: socialValues.social_facebook }),
      ]);
      toast({ title: "Social links updated", description: "Changes are now live on the website." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save. Please try again.", variant: "destructive" });
    }
    setSavingSocial(false);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Site Settings">
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="rounded-none shadow-md">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-72 mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Site Settings">
      <div className="space-y-8">
        {/* Contact Information */}
        <Card className="rounded-none shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-none">
                <Phone className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-xl font-heading uppercase tracking-wide">Contact Information</CardTitle>
                <CardDescription>Phone, email, and service area displayed across the website</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wide">Phone Number</Label>
              <Input
                value={contactValues.phone_number}
                onChange={(e) => setContactValues(v => ({ ...v, phone_number: e.target.value }))}
                placeholder="859-816-2314"
                className="rounded-none border-2"
              />
              <p className="text-xs text-muted-foreground">Format: 859-816-2314</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wide">Primary Email</Label>
              <Input
                type="email"
                value={contactValues.email_primary}
                onChange={(e) => setContactValues(v => ({ ...v, email_primary: e.target.value }))}
                placeholder="info@radcliffconstructiongroup.com"
                className="rounded-none border-2"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wide">Service Area</Label>
              <Textarea
                value={contactValues.service_area}
                onChange={(e) => setContactValues(v => ({ ...v, service_area: e.target.value }))}
                placeholder="Greater Cincinnati, Dayton, Lexington, and Northern Kentucky"
                className="rounded-none border-2 min-h-[80px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center border-t pt-4">
            <span className="text-sm text-muted-foreground">
              {getLastUpdated("contact") ? `Last updated: ${getLastUpdated("contact")}` : ""}
            </span>
            <Button variant="secondary" onClick={saveContactSettings} disabled={savingContact} className="uppercase tracking-wider">
              {savingContact && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Contact Info
            </Button>
          </CardFooter>
        </Card>

        {/* Company Statistics */}
        <Card className="rounded-none shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-none">
                <BarChart3 className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-xl font-heading uppercase tracking-wide">Company Statistics</CardTitle>
                <CardDescription>Numbers displayed on homepage stats bar and About page</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wide">Years Experience</Label>
              <Input
                value={statsValues.stat_years_experience}
                onChange={(e) => setStatsValues(v => ({ ...v, stat_years_experience: e.target.value }))}
                placeholder="25+"
                className="rounded-none border-2"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wide">Projects Completed</Label>
              <Input
                value={statsValues.stat_projects_completed}
                onChange={(e) => setStatsValues(v => ({ ...v, stat_projects_completed: e.target.value }))}
                placeholder="100+"
                className="rounded-none border-2"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wide">Client Satisfaction</Label>
              <Input
                value={statsValues.stat_client_satisfaction}
                onChange={(e) => setStatsValues(v => ({ ...v, stat_client_satisfaction: e.target.value }))}
                placeholder="98%"
                className="rounded-none border-2"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wide">Geographic Coverage</Label>
              <Input
                value={statsValues.stat_coverage}
                onChange={(e) => setStatsValues(v => ({ ...v, stat_coverage: e.target.value }))}
                placeholder="4-State"
                className="rounded-none border-2"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center border-t pt-4">
            <span className="text-sm text-muted-foreground">
              {getLastUpdated("stats") ? `Last updated: ${getLastUpdated("stats")}` : ""}
            </span>
            <Button variant="secondary" onClick={saveStatsSettings} disabled={savingStats} className="uppercase tracking-wider">
              {savingStats && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Statistics
            </Button>
          </CardFooter>
        </Card>

        {/* Social Media */}
        <Card className="rounded-none shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-none">
                <Share2 className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-xl font-heading uppercase tracking-wide">Social Media</CardTitle>
                <CardDescription>Links displayed in footer. Leave blank to hide.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wide">LinkedIn URL</Label>
              <Input
                type="url"
                value={socialValues.social_linkedin}
                onChange={(e) => setSocialValues(v => ({ ...v, social_linkedin: e.target.value }))}
                placeholder="https://linkedin.com/company/..."
                className="rounded-none border-2"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wide">Facebook URL</Label>
              <Input
                type="url"
                value={socialValues.social_facebook}
                onChange={(e) => setSocialValues(v => ({ ...v, social_facebook: e.target.value }))}
                placeholder="https://facebook.com/..."
                className="rounded-none border-2"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center border-t pt-4">
            <span className="text-sm text-muted-foreground">
              {getLastUpdated("social") ? `Last updated: ${getLastUpdated("social")}` : ""}
            </span>
            <Button variant="secondary" onClick={saveSocialSettings} disabled={savingSocial} className="uppercase tracking-wider">
              {savingSocial && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Social Links
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
}
