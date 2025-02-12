"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSnackbar } from "notistack";

const API_URL = "https://oao0vevw58.execute-api.us-east-1.amazonaws.com/dev-model-config/model-config";
const USER_ID = "pranav.murthy"; 

const ModelConfiguration = () => {
  const [temperature, setTemperature] = useState(0.5);
  const [frequencyPenalty, setFrequencyPenalty] = useState(1.0);
  const [topP, setTopP] = useState(0.9);
  const [topK, setTopK] = useState(1.0);
  const [model, setModel] = useState("v1.0");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch model parameters when the component mounts
  useEffect(() => {
    const fetchModelParameters = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}?UserId=${USER_ID}`);
        const data = await response.json();

        if (response.ok) {
          setTemperature(data.temperature || 0.5);
          setTopP(data.top_p || 0.9);
          enqueueSnackbar("Fetched model parameters successfully!", { variant: "success" });
        } else {
          throw new Error("Failed to fetch model parameters");
        }
      } catch (error) {
        console.error("Error fetching model parameters:", error);
        enqueueSnackbar("Failed to fetch model parameters.", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchModelParameters();
  }, [enqueueSnackbar]);

  // Handle input changes for sliders and input fields
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>, min: number, max: number) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value);
      if (!isNaN(value) && value >= min && value <= max) {
        setter(value);
      }
    };

  // Handle model deployment
  const handleDeploy = async () => {
    try {
      setLoading(true);
      const requestBody = {
        user_id: USER_ID,
        temperature,
        top_p: topP,
      };

      const response = await fetch(
        "https://oao0vevw58.execute-api.us-east-1.amazonaws.com/dev-model-config/model-config-update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        enqueueSnackbar("Model deployed successfully!", { variant: "success" });
      } else {
        throw new Error(data.message || "Failed to deploy model");
      }
    } catch (error) {
      console.error("Error deploying model:", error);
      enqueueSnackbar("Failed to deploy model.", { variant: "error" });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Card className="w-full h-full   bg-white">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800 pb-6">Model Configuration</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Model Selection */}
          <div className="flex space-x-4">
            <label className="w-1/8 text-lg font-medium text-gray-700 pt-1">Select Model</label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-1/5">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v1.0">p9-vid-llm-model v1.0</SelectItem>
                <SelectItem value="v2.0">p9-vid-llm-model v2.0</SelectItem>
                <SelectItem value="v3.0">p9-vid-llm-model v3.0</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sliders with Input Fields */}
          <div className="grid grid-cols-2 gap-12 pt-10">
            {[
              { label: "Temperature", value: temperature, setValue: setTemperature, min: 0.01, max: 2.0 },
              { label: "Frequency Penalty", value: frequencyPenalty, setValue: setFrequencyPenalty, min: 0.1, max: 2.0 },
              { label: "Top P", value: topP, setValue: setTopP, min: 0.1, max: 2.0 },
              { label: "Top K", value: topK, setValue: setTopK, min: 0.1, max: 2.0 }
            ].map(({ label, value, setValue, min, max }) => (
              <div key={label} className="flex items-center space-x-4">
                <label className="w-1/2 text-lg font-medium text-gray-700">{label}</label>
                <div className="flex items-center space-x-2 w-full">
                  <Slider
                    value={[value]}
                    min={min}
                    max={max}
                    step={0.01}
                    onValueChange={(val) => setValue(val[0])}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    value={value}
                    min={min}
                    max={max}
                    step="0.01"
                    onChange={handleInputChange(setValue, min, max)}
                    className="w-20 text-center"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Deploy Button */}
          <div className="flex justify-start pt-8">
            <Button variant="default" onClick={() => setOpen(true)} disabled={loading}>
              Deploy Model
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>Confirm Deployment</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to deploy the model?
          </DialogDescription>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleDeploy} disabled={loading}>
              Deploy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModelConfiguration;