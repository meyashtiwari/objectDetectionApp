package com.vision.objectdetection;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

import androidx.annotation.NonNull;
import android.content.Context;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;

import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.label.ImageLabel;
import com.google.mlkit.vision.label.ImageLabeler;
import com.google.mlkit.vision.label.ImageLabeling;
import com.google.mlkit.vision.label.defaults.ImageLabelerOptions;

import android.net.Uri;

public class MLModule extends ReactContextBaseJavaModule {

    private Context applicationContext;

    MLModule(ReactApplicationContext context) {
        super(context);
        applicationContext = context;
    }

    @Override
    public String getName() {
        return "MLModule";
    }

    @ReactMethod
    public void imageAnalyzer(String uri, Promise promise) {
        InputImage image;
        Uri imageURI = Uri.parse(uri);
        try {
            image = InputImage.fromFilePath(applicationContext, imageURI);
            ImageLabelerOptions options = new ImageLabelerOptions.Builder().setConfidenceThreshold(0.7f).build();
            ImageLabeler labeler = ImageLabeling.getClient(options);

            labeler.process(image)
                .addOnSuccessListener(new OnSuccessListener<List<ImageLabel>>() {
                    @Override
                    public void onSuccess(List<ImageLabel> labels) {
                        ImageLabel label = labels.get(0);

                        final String resultLabel = label.getText();
                        promise.resolve(resultLabel);
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        final String error = "empty";
                        promise.resolve(error);
                    }
                });
        } catch(Exception e) {
            String error = "exception";
            promise.resolve(error);
        }
    }
}
