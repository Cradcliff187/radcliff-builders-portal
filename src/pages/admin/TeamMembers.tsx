import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAdminTeamMembers } from "@/hooks/useAdminCMS";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import TeamMemberForm from "@/components/admin/forms/TeamMemberForm";
import DeleteDialog from "@/components/admin/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Plus, CheckCircle, XCircle } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  headshot_url: string;
  bio_short: string;
  bio_long: string;
  anchor_id: string;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const TeamMembers = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const queryClient = useQueryClient();
  const { data: teamMembers, isLoading } = useAdminTeamMembers();

  const columns = [
    {
      key: "headshot_url",
      label: "Photo",
      render: (member: TeamMember) => (
        <img
          src={member.headshot_url}
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=100&background=1B2B43&color=CF791D&bold=true`;
          }}
        />
      ),
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "anchor_id",
      label: "Anchor ID",
      render: (member: TeamMember) => (
        <code className="text-xs bg-muted px-2 py-1 rounded">{member.anchor_id}</code>
      ),
    },
    {
      key: "published",
      label: "Status",
      render: (member: TeamMember) => (
        <div className="flex items-center gap-2">
          {member.published ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">Published</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-gray-400" />
              <span className="text-gray-400">Draft</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: "display_order",
      label: "Order",
      render: (member: TeamMember) => (
        <span className="text-sm font-mono">{member.display_order}</span>
      ),
    },
  ];

  const handleCreate = () => {
    setSelectedTeamMember(null);
    setIsFormOpen(true);
  };

  const handleEdit = (member: TeamMember) => {
    setSelectedTeamMember(member);
    setIsFormOpen(true);
  };

  const handleDelete = (member: TeamMember) => {
    setSelectedTeamMember(member);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (selectedTeamMember) {
        // Update existing team member
        const { error } = await supabase
          .from("team_members")
          .update(data)
          .eq("id", selectedTeamMember.id);

        if (error) throw error;

        toast({
          title: "Team member updated",
          description: "The team member has been updated successfully",
        });
      } else {
        // Create new team member
        const { error } = await supabase
          .from("team_members")
          .insert([data]);

        if (error) throw error;

        toast({
          title: "Team member created",
          description: "The team member has been created successfully",
        });
      }

      queryClient.invalidateQueries({ queryKey: ["admin_team_members"] });
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      setIsFormOpen(false);
      setSelectedTeamMember(null);
    } catch (error) {
      console.error("Error saving team member:", error);
      toast({
        title: "Error",
        description: "Failed to save team member",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = async () => {
    if (!selectedTeamMember) return;

    try {
      // Delete image from storage if it's in company-assets bucket
      if (selectedTeamMember.headshot_url.includes("company-assets")) {
        const urlParts = selectedTeamMember.headshot_url.split("/company-assets/");
        if (urlParts.length > 1) {
          const filePath = urlParts[1].split("?")[0];
          await supabase.storage.from("company-assets").remove([filePath]);
        }
      }

      // Delete team member record
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", selectedTeamMember.id);

      if (error) throw error;

      toast({
        title: "Team member deleted",
        description: "The team member has been deleted successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["admin_team_members"] });
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      setIsDeleteOpen(false);
      setSelectedTeamMember(null);
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Team Members">
      <div className="mb-6">
        <Button onClick={handleCreate} className="rounded-none">
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <DataTable
        data={teamMembers || []}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="uppercase tracking-wide">
              {selectedTeamMember ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>
          <TeamMemberForm
            teamMember={selectedTeamMember}
            onSuccess={handleSubmit}
          />
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={confirmDelete}
        title="Delete Team Member"
        description={`Are you sure you want to delete ${selectedTeamMember?.name}? This action cannot be undone.`}
      />
    </AdminLayout>
  );
};

export default TeamMembers;
