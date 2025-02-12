"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const API_BASE_URL =
  "https://60q8yyrvkk.execute-api.us-east-1.amazonaws.com/v2";
const USER_ID = "pranav.murthy";

const PromptCard: React.FC = () => {
  const [promptText, setPromptText] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const [promptError, setPromptError] = useState<string>("");
  const [commentError, setCommentError] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Snackbar state
  const { toast } = useToast();

  // Fetch existing data from the GET API
  useEffect(() => {
    const fetchPromptConfig = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/prompt-config-GET`, {
          params: { user_id: USER_ID },
        });

        if (response.data) {
          setPromptText(response.data.body.system_prompt || "");
          setCommentText(response.data.body.comment || "");
          setIsSaved(true);
        }
      } catch (error) {
        console.error("Error fetching prompt config:", error);
        toast({
          title: "Error",
          description: "Failed to fetch prompt configuration.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPromptConfig();
  }, [toast]);

  // Handle input changes
  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    wordLimit: number
  ): void => {
    const inputText = event.target.value;
    const wordCount = inputText.trim().split(/\s+/).length;

    setIsSaved(false);

    if (wordCount > wordLimit) {
      setError(`Limit exceeded. Maximum ${wordLimit} words allowed.`);
    } else {
      setError("");
      setter(inputText);
    }
  };

  // Save data using the PUT API
  const handleSave = async (): Promise<void> => {
    if (!promptText.trim() && !commentText.trim()) {
      toast({
        title: "Error",
        description: "System Prompt or Comment is required.",
        variant: "destructive",
      });
      return;
    }

    if (promptError || commentError) {
      return;
    }

    const payload = {
      user_id: USER_ID,
      system_prompt: promptText,
      comment: commentText,
    };

    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/prompt-config-PUT`, payload);

      setIsSaved(true);
      toast({
        title: "Success",
        description: "Changes saved successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error saving prompt config:", error);
      toast({
        title: "Error",
        description: "Failed to save changes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 ml-5 mb-4 bg-white border border-gray-300 rounded-lg shadow-md h-[calc(108vh-90px)]">
      <CardHeader>
        <CardTitle className="text-lg font-bold leading-[22.4px] text-left mb-2.5">
          Prompt Template
        </CardTitle>
        <CardDescription className="text-sm font-normal leading-[19.6px] text-left text-gray-500 mb-0">
          Give instructions to the model
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Textarea
          value={promptText}
          onChange={(e) =>
            handleTextChange(e, setPromptText, setPromptError, 500)
          }
          placeholder="Please type your text here..."
          className="w-full h-[150px] p-2.5 text-sm leading-5 border border-gray-300 rounded-lg resize-y placeholder-opacity-100"
          disabled={loading}
        />

        <Separator className="my-3 border border-gray-300" />

        {promptError && (
          <p className="text-red-500 text-xs leading-[10px]">{promptError}</p>
        )}

        <CardTitle className="text-lg font-bold leading-10 text-left mt-2.5">
          Comment
        </CardTitle>

        <Textarea
          value={commentText}
          onChange={(e) =>
            handleTextChange(e, setCommentText, setCommentError, 100)
          }
          placeholder="Please type your text here..."
          className="w-full h-[51px] p-2.5 text-sm leading-[36px] border border-gray-300 rounded-lg placeholder-opacity-100 overflow-hidden"
          disabled={loading}
        />

        <Separator className="my-3 border border-gray-300" />

        {commentError && (
          <p className="text-red-500 text-xs mt-[-5px] leading-5">
            {commentError}
          </p>
        )}

        <Button
          variant="outline"
          onClick={handleSave}
          disabled={loading}
          className={`bg-black text-white text-sm capitalize mt-7 ${
            isSaved ? "w-[90px]" : "w-[156px]"
          } flex items-center gap-0 hover:bg-black/90`}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <>
              <Check className="text-white w-4 h-4 mr-2" />
              <span className="text-white mr-2">
                {isSaved ? "Saved" : "Save Changes"}
              </span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PromptCard;