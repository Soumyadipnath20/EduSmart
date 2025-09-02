'use server';
/**
 * @fileOverview Curriculum activity analysis AI agent.
 *
 * - analyzeCurriculumActivity - A function that handles the curriculum analysis process.
 * - AnalyzeCurriculumActivityInput - The input type for the analyzeCurriculumActivity function.
 * - AnalyzeCurriculumActivityOutput - The return type for the analyzeCurriculumActivity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCurriculumActivityInputSchema = z.object({
  activityData: z
    .string()
    .describe(
      'Data representing curriculum activities, including details such as topics covered, time spent, resources used, and student engagement metrics.'
    ),
});
export type AnalyzeCurriculumActivityInput = z.infer<
  typeof AnalyzeCurriculumActivityInputSchema
>;

const AnalyzeCurriculumActivityOutputSchema = z.object({
  summary: z.string().describe('A summary of the curriculum activity.'),
  insights: z
    .string()
    .describe(
      'Key insights and trends identified in the curriculum activity data, highlighting areas of strength and areas needing improvement.'
    ),
  recommendations: z
    .string()
    .describe(
      'Specific recommendations for improving resource allocation, curriculum design, and teaching strategies based on the analysis.'
    ),
});
export type AnalyzeCurriculumActivityOutput = z.infer<
  typeof AnalyzeCurriculumActivityOutputSchema
>;

export async function analyzeCurriculumActivity(
  input: AnalyzeCurriculumActivityInput
): Promise<AnalyzeCurriculumActivityOutput> {
  return analyzeCurriculumActivityFlow(input);
}

const analyzeCurriculumActivityPrompt = ai.definePrompt({
  name: 'analyzeCurriculumActivityPrompt',
  input: {schema: AnalyzeCurriculumActivityInputSchema},
  output: {schema: AnalyzeCurriculumActivityOutputSchema},
  prompt: `You are an AI assistant that analyzes curriculum activity data and provides actionable insights for curriculum improvement.

  Analyze the following curriculum activity data:
  {{activityData}}

  Provide a summary of the activities, key insights, and specific recommendations for improvement in the following format:
  Summary: ...
  Insights: ...
  Recommendations: ...`,
});

const analyzeCurriculumActivityFlow = ai.defineFlow(
  {
    name: 'analyzeCurriculumActivityFlow',
    inputSchema: AnalyzeCurriculumActivityInputSchema,
    outputSchema: AnalyzeCurriculumActivityOutputSchema,
  },
  async input => {
    const {output} = await analyzeCurriculumActivityPrompt(input);
    return output!;
  }
);
