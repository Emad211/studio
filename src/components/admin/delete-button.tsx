"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";

interface DeleteButtonProps {
  itemType: string;
  itemName: string;
  deleteAction: () => Promise<void>;
}

export function DeleteButton({ itemType, itemName, deleteAction }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteAction();
        toast({
          title: "موفقیت",
          description: `${itemType} "${itemName}" با موفقیت حذف شد.`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: `خطا در حذف ${itemType}. لطفاً دوباره تلاش کنید.`,
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          حذف
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
          <AlertDialogDescription>
            این عمل قابل بازگشت نیست. با این کار {itemType} با عنوان «{itemName}» برای همیشه حذف خواهد شد.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>انصراف</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending} className="bg-destructive hover:bg-destructive/90">
            {isPending ? "در حال حذف..." : "بله، حذف کن"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
