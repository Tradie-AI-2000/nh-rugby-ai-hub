"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { QuestionnaireData } from "@/lib/types";

interface Submission extends QuestionnaireData {
    id: string;
}

export function SubmissionsTable({ submissions }: { submissions: Submission[] }) {
  return (
    <Table>
      <TableCaption>A list of questionnaire submissions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Role</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>AI Experience</TableHead>
          <TableHead>Tasks</TableHead>
          <TableHead>Pain Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell>{submission.role}</TableCell>
            <TableCell>{submission.department}</TableCell>
            <TableCell>{submission.aiExperience}</TableCell>
            <TableCell className="max-w-xs truncate">{submission.tasks}</TableCell>
            <TableCell className="max-w-xs truncate">{submission.painPoints}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
