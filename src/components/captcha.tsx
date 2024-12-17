'use client';

import {Minus, Plus, RefreshCcw} from 'lucide-react';
import {useState} from 'react';
import {Button} from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

// Implement this CAPTCHA to make sure
// that only robots can use this app.

// If you need more of a challenge, create
// a different CAPTCHA mechanism. E.g.:
// 1. Display 9 robots in a grid, click on the yellow one.
// 2. Robo Slot Machine - get 3 times the same robo.
// 3. Turn a Robot until it is aligned on the x-axis.

export const Captcha = () => {
  const [result] = useState(0);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Only Androids Allowed!</CardTitle>
          <CardDescription>Robot Verification: Solve the math.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4 text-xl">
            <div>8 + 3 =</div>
            <Button variant="secondary" type="button">
              <Minus />
            </Button>
            {result}
            <Button variant="secondary" type="button">
              <Plus />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            <RefreshCcw />
            Retry
          </Button>
          <Button type="button">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
