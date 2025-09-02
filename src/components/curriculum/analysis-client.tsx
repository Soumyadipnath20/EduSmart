'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Loader2, Sparkles } from 'lucide-react';

import { analyzeCurriculumActivity, AnalyzeCurriculumActivityOutput } from '@/ai/flows/analyze-curriculum-activity';
import { recommendCurriculumResources, RecommendCurriculumResourcesOutput } from '@/ai/flows/recommend-curriculum-resources';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const activitySchema = z.object({
  activityData: z.string().min(50, 'Please provide detailed activity data (at least 50 characters).'),
});

const resourceSchema = z.object({
  activityFeedback: z.string().min(50, 'Please provide detailed feedback (at least 50 characters).'),
  currentCurriculum: z.string().min(20, 'Please describe the current curriculum (at least 20 characters).'),
});

export function CurriculumAnalysisClient() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('analysis');

  const [analysisResult, setAnalysisResult] = useState<AnalyzeCurriculumActivityOutput | null>(null);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);

  const [resourceResult, setResourceResult] = useState<RecommendCurriculumResourcesOutput | null>(null);
  const [isResourceLoading, setIsResourceLoading] = useState(false);

  const activityForm = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema),
    defaultValues: { activityData: '' },
  });

  const resourceForm = useForm<z.infer<typeof resourceSchema>>({
    resolver: zodResolver(resourceSchema),
    defaultValues: { activityFeedback: '', currentCurriculum: '' },
  });

  async function onActivitySubmit(values: z.infer<typeof activitySchema>) {
    setIsAnalysisLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeCurriculumActivity(values);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing curriculum activity:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'There was an error processing your request. Please try again.',
      });
    } finally {
      setIsAnalysisLoading(false);
    }
  }

  async function onResourceSubmit(values: z.infer<typeof resourceSchema>) {
    setIsResourceLoading(true);
    setResourceResult(null);
    try {
      const result = await recommendCurriculumResources(values);
      setResourceResult(result);
    } catch (error) {
      console.error('Error recommending resources:', error);
      toast({
        variant: 'destructive',
        title: 'Recommendation Failed',
        description: 'There was an error processing your request. Please try again.',
      });
    } finally {
      setIsResourceLoading(false);
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="analysis">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="analysis">Activity Analysis</TabsTrigger>
        <TabsTrigger value="resources">Resource Recommendations</TabsTrigger>
      </TabsList>
      <TabsContent value="analysis">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Curriculum Activity</CardTitle>
              <CardDescription>
                Input raw data about curriculum activities, topics, time spent, and student engagement to get AI-powered insights.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...activityForm}>
                <form onSubmit={activityForm.handleSubmit(onActivitySubmit)} className="space-y-6">
                  <FormField
                    control={activityForm.control}
                    name="activityData"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activity Data</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'Week 5, CS101: 80 students attended the lecture on data structures. 75% completed the homework. Average quiz score was 82%. Students reported high engagement with the interactive coding session but found the theory part dry...'"
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isAnalysisLoading} className="w-full">
                    {isAnalysisLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                    Analyze Activity
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>AI Analysis Results</CardTitle>
              <CardDescription>Insights will appear here after analysis.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
              {isAnalysisLoading ? (
                <div className="text-center text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p>Analyzing data... This may take a moment.</p>
                </div>
              ) : analysisResult ? (
                <div className="space-y-4 text-sm w-full">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Summary</h3>
                    <p className="p-4 bg-secondary/50 rounded-md">{analysisResult.summary}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Insights</h3>
                    <p className="p-4 bg-secondary/50 rounded-md">{analysisResult.insights}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
                    <p className="p-4 bg-secondary/50 rounded-md">{analysisResult.recommendations}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Sparkles className="h-8 w-8 mx-auto mb-2" />
                  <p>Your analysis results will be displayed here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="resources">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommend Curriculum Resources</CardTitle>
              <CardDescription>
                Provide feedback and describe your current curriculum to receive tailored resource recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...resourceForm}>
                <form onSubmit={resourceForm.handleSubmit(onResourceSubmit)} className="space-y-6">
                  <FormField
                    control={resourceForm.control}
                    name="activityFeedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activity Feedback</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'Students are struggling with abstract concepts in quantum mechanics. Engagement drops during theoretical lectures. They perform better with visual aids and simulations...'"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={resourceForm.control}
                    name="currentCurriculum"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Curriculum</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 'Standard university physics textbook, weekly lectures.'"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isResourceLoading} className="w-full">
                    {isResourceLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                    Get Recommendations
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>AI Resource Recommendations</CardTitle>
              <CardDescription>Recommendations will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
              {isResourceLoading ? (
                <div className="text-center text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p>Generating recommendations...</p>
                </div>
              ) : resourceResult ? (
                <div className="space-y-4 text-sm w-full">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Recommended Resources</h3>
                    <ul className="list-disc list-inside p-4 bg-secondary/50 rounded-md space-y-2">
                      {resourceResult.recommendedResources.map((res, i) => <li key={i}>{res}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Rationale</h3>
                    <p className="p-4 bg-secondary/50 rounded-md">{resourceResult.rationale}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Sparkles className="h-8 w-8 mx-auto mb-2" />
                  <p>Your resource recommendations will be displayed here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
