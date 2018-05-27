package com.imeriemlab.sitecultuel.cucumber.stepdefs;

import com.imeriemlab.sitecultuel.SiteCultuelApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = SiteCultuelApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
