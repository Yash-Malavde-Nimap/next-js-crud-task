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
import Link from "next/link";
import Button from "../Buttons/Button";

const Dialog = ({ button, className, id, method }) => {
  if (button == "edit") {
    return (
      <div>
        <AlertDialog>
          <AlertDialogTrigger className={className}>Edit</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to edit the post?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will edit your post
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>
                <Link href={`/posts/edit-post/${id}`}>Continue</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  } else if (button == "delete") {
    return (
      <div >
        <AlertDialog>
          <AlertDialogTrigger className={className}>Delete</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to Delete the post?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will Delete your post from
                the Database
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-700">
                <Button label="Delete" method={method} />
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
};

export default Dialog;
