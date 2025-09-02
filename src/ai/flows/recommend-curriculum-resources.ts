// This is a server-side file.
'use server';

/**
 * @fileOverview Recommends curriculum resources based on activity feedback.
 *
 * - recommendCurriculumResources - A function that recommends curriculum resources.
 * - RecommendCurriculumResourcesInput - The input type for the recommendCurriculumResources function.
 * - RecommendCurriculumResourcesOutput - The return type for the recommendCurriculumResources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendCurriculumResourcesInputSchema = z.object({
  activityFeedback: z
    .string()
    .describe(
      'Feedback on recent curriculum activities, including student performance and engagement.'
    ),
  currentCurriculum: z
    .string()
    .describe('A description of the currently used curriculum.'),
});

export type RecommendCurriculumResourcesInput = z.infer<
  typeof RecommendCurriculumResourcesInputSchema
>;

const RecommendCurriculumResourcesOutputSchema = z.object({
  recommendedResources: z
    .array(z.string())
    .describe(
      'A list of recommended curriculum resources (e.g., articles, videos, books) based on the activity feedback.'
    ),
  rationale: z
    .string()
    .describe(
      'Explanation of why the resources are recommended based on the activity feedback.'
    ),
});

export type RecommendCurriculumResourcesOutput = z.infer<
  typeof RecommendCurriculumResourcesOutputSchema
>;

export async function recommendCurriculumResources(
  input: RecommendCurriculumResourcesInput
): Promise<RecommendCurriculumResourcesOutput> {
  return recommendCurriculumResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendCurriculumResourcesPrompt',
  input: {schema: RecommendCurriculumResourcesInputSchema},
  output: {schema: RecommendCurriculumResourcesOutputSchema},
  prompt: `You are an expert curriculum advisor, specializing in improving teaching methods.

Based on the activity feedback and the current curriculum, recommend curriculum resources that can improve teaching methods.

Activity Feedback: {{{activityFeedback}}}
Current Curriculum: {{{currentCurriculum}}}

Consider diverse resource types such as articles, videos, and books.
Explain the rationale for each recommended resource.

Output the recommended resources and rationale in JSON format.`,
});

const recommendCurriculumResourcesFlow = ai.defineFlow(
  {
    name: 'recommendCurriculumResourcesFlow',
    inputSchema: RecommendCurriculumResourcesInputSchema,
    outputSchema: RecommendCurriculumResourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
